

export function getScroller(scollEndCb: () => void) {
  let lastScrollOffset = null;
  let isLastEndReached = false;
  const handleScrollEnd = (event) => {
    // console.log(event)
    // debugger
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    // console.log(scrollOffset, scrollViewHeight, scrollOffset + scrollViewHeight, "444444444444", contentHeight);
    const isEndReached = scrollOffset + scrollViewHeight + 60 >= contentHeight; // Slide to the bottom or not
    // const isContentFillPage = contentHeight >= scrollViewHeight; // Whether the content height is greater than the list height

    const isDown = scrollOffset - lastScrollOffset >= 0;

    // console.log(`scrollOffset ${scrollOffset} lastScrollOffset ${lastScrollOffset} isDowning ${isDown}`);
    // console.log(`isEndReached ${isEndReached}, isDown ${isDown}, isLastEndReached ${isLastEndReached}`);
    // isDirectionChange = isDirectionChange || lastDown != isDown;
    // if (isContentFillPage && isEndReached && isDowning) {
    if (isDown && isEndReached && !isLastEndReached) {
      // lastScrollOffset = null;
      // console.log('load more');
      scollEndCb();
    }
    lastScrollOffset = scrollOffset;
    isLastEndReached = isEndReached && isDown;
  }

  return handleScrollEnd;
}