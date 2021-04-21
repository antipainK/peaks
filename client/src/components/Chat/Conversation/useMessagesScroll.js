import { useRef, useEffect } from 'react';

export default function useMessagesScroll(
  currentThreadId,
  messages,
  isLoading
) {
  const listRef = useRef();

  const scrollToBottom = (newMessage) => {
    const listEl = listRef.current;
    if (listEl) {
      const scroll = listEl.scrollHeight - listEl.clientHeight;
      const bottomOffset = scroll - listEl.scrollTop;
      if (!newMessage || bottomOffset < 300) {
        listEl.scrollTo(0, scroll);
      }
    }
  };

  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [currentThreadId, isLoading]);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);

  return {
    listRef,
  };
}
