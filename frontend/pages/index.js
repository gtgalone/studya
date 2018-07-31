import React from 'react'

let lastScrollY = 0
let ticking = false


class Index extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  nav = React.createRef()

  handleScroll = () => {
    lastScrollY = window.scrollY

    if (!ticking) {
      window.requestAnimationFrame(() => {
        this.nav.current.style.height = `${460 - lastScrollY}px`
        ticking = false
      })
      ticking = true
    }
  };
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between p-3">
          <h1 className="text-white text-info">studya</h1>
          <button type="button" className="btn btn-warning text-white m-2">로그인</button>
        </div>
        <div ref={this.nav} className="main-image d-flex flex-column justify-content-center align-items-center position-relative">
          <div className="background-shadow position-absolute"></div>
          <div className="main-image-text position-relative text-center">
            <div className="text-white display-4 font-weight-bold">스터디 모임 커뮤니티</div>
            <button type="button" className="btn btn-danger text-white m-2">가입하기</button>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center p-3" style={{ minWidth: '50%'}}>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">영어 스터디 모집</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">회화 스터디 같이하실분</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">개발 스터디 합시다</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">토플 스터디 (120점 목표)</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">개발 스터디 해요</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">토익 스터디 할 사람</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">수학 스터디 모집해요</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">개발 스터디 같이 해보실 분</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">회화 스터디 할까요?</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
          <div className="card m-1" style={{ width: '18rem' }}>
            <img class="card-img-top" src="/static/card-image.jpg" height="180" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">개발 스터디</h5>
              <p className="card-text">일상생활에 필요한 영어를</p>
              <div className="text-center">
                <a href="#" className="btn btn-info">살펴보기</a>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`{
          .main-image {
            height: 460px;
            min-height: 200px;
            background-image: url(/static/main-image.jpg);
            background-size: cover;
            background-position: center;
          }
          .main-image-text {
            z-index: 5;
          }
          .background-shadow {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1;
          }
        }`}</style>
      </div>
    )
  }
}

export default Index
