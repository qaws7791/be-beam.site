import { useCallback, useEffect, useRef, useState } from 'react';

import type { Meeting } from '@/shared/types/entities';
import MeetingDetailContentTab from './MeetingDetailContentTab';
import MeetingDetailContent from './MeetingDetailContent';
import { cn } from '@/styles/tailwind';

export default function MeetingDetailContentWrap({
  meeting,
}: {
  meeting: Meeting;
}) {
  const HEADER_HEIGHT = 100;
  const TAB_HEIGHT = 52;
  const HEADER_AND_TAB_HEIGHT = HEADER_HEIGHT + TAB_HEIGHT;

  const [tab, setTab] = useState('intro');
  const [isFixed, setIsFixed] = useState(false);
  const [fixedTabStyle, setFixedTabStyle] = useState({
    width: '100%',
    left: '0px',
  });

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const wrapRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback(
    (value: string) => {
      setTab(value);

      const element = sectionRefs.current[value];

      if (element) {
        const elementRect = element.getBoundingClientRect();
        const elementAbsoluteTop = elementRect.top + window.scrollY;

        let offsetHeight = 0;

        if (isFixed) {
          offsetHeight = HEADER_AND_TAB_HEIGHT;
        } else {
          offsetHeight = HEADER_AND_TAB_HEIGHT + 20;
        }

        const targetScrollY = elementAbsoluteTop - offsetHeight;

        window.scrollTo({
          behavior: 'smooth',
          top: targetScrollY > 0 ? targetScrollY : 0,
        });
      }
    },
    [isFixed, HEADER_AND_TAB_HEIGHT],
  );

  useEffect(() => {
    const SCROLL_SPY_OFFSET = HEADER_HEIGHT + TAB_HEIGHT;

    const calculateFixedBounds = () => {
      const wrapElement = wrapRef.current;

      if (!wrapElement) return;

      const rect = wrapElement.getBoundingClientRect();

      setFixedTabStyle({
        width: `${wrapElement.offsetWidth}px`,
        left: `${rect.left}px`,
      });

      const wrapStartPageY = rect.top + window.scrollY;
      const wrapEndPageY = wrapStartPageY + wrapElement.offsetHeight;

      const fixedStartScroll = wrapStartPageY - HEADER_HEIGHT;
      const fixedEndScroll = wrapEndPageY - TAB_HEIGHT - HEADER_HEIGHT;
      const currentScrollY = window.scrollY;
      const shouldBeFixed =
        currentScrollY >= fixedStartScroll && currentScrollY < fixedEndScroll;
      setIsFixed(shouldBeFixed);

      if (shouldBeFixed) {
        const sections = sectionRefs.current;
        const keys = Object.keys(sections);

        let activeTab = tab;

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const sectionElement = sections[key];

          if (sectionElement) {
            const sectionTop = sectionElement.getBoundingClientRect().top;

            if (sectionTop <= SCROLL_SPY_OFFSET && sectionTop > 0) {
              activeTab = key;
              break;
            }

            if (sectionTop < 0) {
              activeTab = key;
            }
          }
        }

        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const isAtBottom =
          Math.ceil(currentScrollY + windowHeight) >= documentHeight;

        if (isAtBottom) {
          activeTab = keys[keys.length - 1];
        }

        if (activeTab !== tab) {
          setTab(activeTab);
        }
      }
    };

    calculateFixedBounds();

    window.addEventListener('scroll', calculateFixedBounds);
    window.addEventListener('resize', calculateFixedBounds);

    return () => {
      window.removeEventListener('scroll', calculateFixedBounds);
      window.removeEventListener('resize', calculateFixedBounds);
    };
  }, [tab]);

  return (
    <div
      className={cn(
        meeting.guidebook && 'border-b-1 border-gray-300',
        'mt-5 mb-5 w-full bg-white lg:mb-10',
      )}
    >
      <div ref={wrapRef}>
        <MeetingDetailContentTab
          tab={tab}
          scrollToSection={scrollToSection}
          isFixed={isFixed}
          fixedTabStyle={fixedTabStyle}
        />

        <MeetingDetailContent meeting={meeting} sectionRefs={sectionRefs} />
      </div>
    </div>
  );
}
