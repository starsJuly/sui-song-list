import { Modal } from "react-bootstrap";

import styles from "../styles/Home.module.css";

export default function BiliPlayerModal
  ({ props: [ Title, Visibility, ListSelector ] }) {
  
  const bvid_url = bvid => '//player.bilibili.com/player.html?bvid=' + bvid;
  
  return (
    <Modal show = { Visibility.visible } onHide = { Visibility.on_hide } fullscreen = "xl-down" size = "xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          { Title }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className = { styles.biliPlayerDiv }>
          <p className = { styles.bvid_bar }>{ ListSelector.list.map((bvid) => (
            <span
              className = { ( ListSelector.selected === bvid
                            ? styles.bvid_bar__item + ' ' + styles.bvid_bar__item__inactive
                            : styles.bvid_bar__item
                          ) }

              onClick = { e => ListSelector.set_selected(e.currentTarget.textContent) }
              
              key = { bvid }
            >
              { bvid }
            </span>)) }
          </p>
          <iframe src = { bvid_url(ListSelector.selected) } width = "100%" height = "100%" scrolling = "no" border = "0" frameBorder = "no" allowFullScreen = { true }>
          </iframe>
        </div>
      </Modal.Body>
    </Modal>
  )
}
