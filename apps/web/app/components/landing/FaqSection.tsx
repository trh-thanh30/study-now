import React from 'react';
import { Accordion, AccordionItem, AccordionControl, AccordionPanel } from '@mantine/core';

export function FaqSection() {
  const faqs = [
    {
      question: 'What is Deep Work?',
      answer:
        'Deep Work is a state of intense focus and concentration during which you eliminate distractions and dedicate your full attention to a cognitively demanding task. This allows you to produce higher-quality work in less time. The concept was popularized by author Cal Newport, who emphasizes that Deep Work helps you stand out in an increasingly distracted world by mastering complex skills and producing meaningful results.',
    },
    {
      question: 'How long should a work session be?',
      answer:
        'A typical Deep Work session lasts between 25 and 45 minutes or you can customize it to your needs, followed by a short 5–15 minute break to rest your mind. However, depending on your level of focus and experience, you can extend sessions up to 90 minutes. The key is to stop when your concentration starts to fade — pushing too long can lead to mental fatigue and reduced quality of work. Many people find success using structured time blocks like the Pomodoro technique or 90-minute ultradian rhythm cycles.',
    },
    {
      question: 'Why is taking breaks important?',
      answer:
        'Breaks are essential because the brain naturally operates in cycles of intense focus followed by rest. When you take short, intentional breaks, you allow your neural pathways to recover and consolidate what you’ve learned. This helps prevent burnout, keeps creativity high, and sustains productivity over the long term. Even a few minutes of stretching, walking, or deep breathing can refresh your energy and mental clarity for the next session.',
    },
    {
      question: 'Can I use this method for studying?',
      answer:
        'Absolutely. Deep Work principles apply perfectly to studying, reading, writing, or any form of learning that requires sustained focus. Students often find that using Deep Work sessions for subjects like mathematics, programming, or writing essays dramatically increases both retention and understanding. The goal is not just to spend more time studying, but to study with full, undivided attention — free from notifications and multitasking.',
    },
    {
      question: 'How can I reduce distractions during Deep Work sessions?',
      answer:
        'Start by creating a dedicated workspace where distractions are minimized — ideally a quiet place with your phone on silent or in another room. Use tools like website blockers, focus playlists, or noise-canceling headphones. Communicate your Deep Work hours to others so they know not to interrupt. Over time, your brain learns to associate this environment with focus, making it easier to enter a flow state more quickly.',
    },
    {
      question: 'What should I do if my mind keeps wandering?',
      answer:
        'It’s completely normal for your mind to wander, especially when you’re new to Deep Work. The goal is not to eliminate distractions entirely, but to recognize them and gently bring your attention back to the task. Techniques like mindfulness meditation, breathing exercises, or writing down intrusive thoughts to address later can help you regain focus. Over time, your ability to sustain attention strengthens like a muscle.',
    },
    {
      question: 'Is multitasking bad for productivity?',
      answer:
        'Yes, multitasking significantly reduces cognitive performance because your brain must constantly switch between tasks. This creates “attention residue,” where part of your focus remains on the previous task, slowing down your thinking and increasing errors. Deep Work encourages monotasking — focusing on one meaningful activity at a time — which leads to higher efficiency and deeper satisfaction from completing work at a high level.',
    },
  ];

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold  text-center mb-10">
        Frequently Asked Questions
      </h2>
      <Accordion>
        {faqs.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionControl>
              <span className="text-lg font-semibold">{item.question}</span>
            </AccordionControl>
            <AccordionPanel>
              <span className="text-base text-gray-600">{item.answer}</span>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
