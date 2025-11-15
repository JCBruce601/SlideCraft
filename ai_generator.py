"""
AI-Powered Presentation Generator
Uses Claude to intelligently create presentation content from user input
"""

import os
import json
from typing import Dict, List, Optional
import anthropic


class AIContentGenerator:
    """Generate presentation content using Claude AI"""

    def __init__(self, api_key: Optional[str] = None):
        """Initialize with Anthropic API key"""
        self.api_key = api_key or os.getenv('ANTHROPIC_API_KEY')
        if not self.api_key:
            raise ValueError("ANTHROPIC_API_KEY not found. Set it in .env or pass it directly.")
        self.client = anthropic.Anthropic(api_key=self.api_key)

    def generate_presentation_structure(
        self,
        topic: str,
        content: str,
        theme: str = 'software_professional',
        num_slides: Optional[int] = None,
        presentation_type: str = 'general'
    ) -> Dict:
        """
        Generate complete presentation structure from user input

        Args:
            topic: Main topic/title of presentation
            content: User's notes, agenda, outline, or scripture references
            theme: Visual theme to apply
            num_slides: Target number of slides (if None, AI decides)
            presentation_type: Type of presentation (sermon, business, education, etc.)

        Returns:
            Dict with presentation structure ready for create_presentation()
        """

        # Build the prompt for Claude
        prompt = self._build_generation_prompt(topic, content, num_slides, presentation_type)

        # Call Claude API
        message = self.client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4000,
            temperature=0.7,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )

        # Parse response
        response_text = message.content[0].text

        # Extract JSON from response
        slides_content = self._parse_ai_response(response_text)

        return {
            'theme': theme,
            'slides_content': slides_content
        }

    def _build_generation_prompt(
        self,
        topic: str,
        content: str,
        num_slides: Optional[int],
        presentation_type: str
    ) -> str:
        """Build the prompt for Claude to generate presentation content"""

        slide_count_guidance = f"Create approximately {num_slides} slides" if num_slides else "Create an appropriate number of slides (typically 8-15)"

        type_guidance = {
            'sermon': """
This is a SERMON presentation. Structure it with:
- Opening with scripture reference
- 2-3 main points with biblical application
- Practical takeaways
- Closing prayer points
""",
            'business': """
This is a BUSINESS presentation. Structure it with:
- Executive summary/overview
- Key metrics or data points
- Main content organized logically
- Action items and next steps
""",
            'education': """
This is an EDUCATIONAL presentation. Structure it with:
- Learning objectives
- Core concepts broken down clearly
- Examples and illustrations
- Summary and key takeaways
""",
            'general': """
This is a GENERAL presentation. Structure it professionally with:
- Clear introduction
- Logically organized main content
- Supporting details
- Conclusion with key points
"""
        }

        prompt = f"""You are an expert presentation designer creating a professional PowerPoint presentation.

**Topic:** {topic}

**User's Content/Notes:**
{content}

**Instructions:**
{slide_count_guidance} for this presentation.
{type_guidance.get(presentation_type, type_guidance['general'])}

Analyze the user's content and create a well-structured presentation. Return ONLY a JSON array of slide objects.

**Available Slide Types:**
1. "title" - Title slide with main title and subtitle
2. "content" - Content slide with title and bullet points
3. "section" - Section divider with large title and optional section number
4. "two_column" - Two-column layout with headers and items
5. "quote" - Large quote or key message
6. "stats" - Big numbers/statistics highlight

**JSON Format:**
```json
[
  {{
    "type": "title",
    "title": "Main Presentation Title",
    "subtitle": "Subtitle or tagline",
    "notes": "Speaker notes for this slide"
  }},
  {{
    "type": "content",
    "title": "Slide Title",
    "bullets": [
      "First bullet point",
      "Second bullet point",
      "Third bullet point"
    ],
    "notes": "Speaker notes explaining this slide"
  }},
  {{
    "type": "section",
    "title": "Section Name",
    "section_number": "01"
  }},
  {{
    "type": "two_column",
    "title": "Comparison or Split Content",
    "left_header": "Before",
    "left_items": ["Point 1", "Point 2"],
    "right_header": "After",
    "right_items": ["Result 1", "Result 2"],
    "notes": "Speaker notes"
  }}
]
```

**Quality Guidelines:**
- Make titles concise and impactful (5-8 words max)
- Bullet points should be brief (one line each)
- Use parallel structure in bullets
- Add substantive speaker notes for each slide
- Include opening and closing slides
- Break complex topics into multiple slides
- Use section slides to organize major topics

Return ONLY the JSON array, no other text or explanation."""

        return prompt

    def _parse_ai_response(self, response: str) -> List[Dict]:
        """Parse Claude's response to extract slide structure"""

        # Try to find JSON in the response
        try:
            # Look for JSON array in the response
            start = response.find('[')
            end = response.rfind(']') + 1

            if start == -1 or end == 0:
                raise ValueError("No JSON array found in response")

            json_str = response[start:end]
            slides = json.loads(json_str)

            # Validate structure
            if not isinstance(slides, list):
                raise ValueError("Response is not a list of slides")

            # Ensure all slides have required fields
            for slide in slides:
                if 'type' not in slide:
                    slide['type'] = 'content'
                if 'notes' not in slide:
                    slide['notes'] = ''

            return slides

        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse AI response as JSON: {e}")
        except Exception as e:
            raise ValueError(f"Error processing AI response: {e}")


def generate_with_ai(
    topic: str,
    content: str,
    theme: str = 'software_professional',
    num_slides: Optional[int] = None,
    presentation_type: str = 'general',
    api_key: Optional[str] = None
) -> Dict:
    """
    Convenience function to generate presentation with AI

    Args:
        topic: Presentation topic
        content: User's notes/agenda/outline
        theme: Visual theme
        num_slides: Target slide count (optional)
        presentation_type: Type of presentation
        api_key: Anthropic API key (optional, reads from env)

    Returns:
        Configuration dict ready for create_presentation()
    """
    generator = AIContentGenerator(api_key)
    return generator.generate_presentation_structure(
        topic=topic,
        content=content,
        theme=theme,
        num_slides=num_slides,
        presentation_type=presentation_type
    )


# Example usage
if __name__ == '__main__':
    # Example: Generate a sermon presentation
    config = generate_with_ai(
        topic="Walking in Faith",
        content="""
Scripture: Hebrews 11:1-6

Main Points:
1. Faith is substance - it's real and tangible
2. Faith pleases God - without it we can't please Him
3. Faith requires action - examples from Hall of Faith

Application:
- Trust God in one specific area this week
- Look for evidence of God's faithfulness
- Take a step of faith in your relationships
        """,
        presentation_type='sermon',
        theme='church_warmth'
    )

    print("Generated presentation structure:")
    print(json.dumps(config, indent=2))
