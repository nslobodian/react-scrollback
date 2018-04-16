import React from 'react';
import * as Scroll from 'react-scroll';
import { animateScroll as scroll, Events, scrollSpy } from 'react-scroll'
import './style.css'
const scrollOffest = 200

class ScrollBack extends React.Component {
  state = {
    isUp: false,
    needToSavePosition: false,
    lastPositionY: 0,
  }

  componentDidMount() {
    scrollSpy.mount(document)    
    scrollSpy.addSpyHandler(this.handleScroll, document)
  }

  componentWillUnmount() {
    scrollSpy.unmount(null, this.handleScroll)
  }

  scrollToTop = () => {
    this.setState({ needToSavePosition: true })
    scroll.scrollToTop();
  }

  scrollToBottom = () => {
    scroll.scrollTo(this.state.lastPositionY)
  }

  handleScroll = (positionY) => {
    console.log(positionY)
    if (this.state.needToSavePosition) {
      this.setState({ lastPositionY: positionY, needToSavePosition: false })
    }

    this.setState({ isUp: positionY > scrollOffest })
  }

  isVisible = () => (this.state.isUp || this.state.lastPositionY) && document.body.clientHeight > window.innerHeight

  render() {
    const isUp = this.state.isUp
    return (
      (this.isVisible())
        ? <div 
        className='scroll-wrapper'
        onClick={isUp
          ? this.scrollToTop
          : this.scrollToBottom
        }        
        ><div className='arrow-wrapper'><i className={`arrow ${isUp ? 'up' : 'down'}`}/></div></div>
        : null
    );
  }
}
export default ScrollBack;