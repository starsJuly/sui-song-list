import { Modal } from "react-bootstrap";

import styles from "../styles/Home.module.css";

import { eff_set } from "../config/controllers";

export default function BiliPlayerModal
  ({ props: [ Title, Visible, List, Selected, EffThis, ] }) {
  
  const bvid_url = bvid => '//player.bilibili.com/player.html?bvid=' + bvid;
  
  return (
    <Modal show = { Visible } onHide = { EffThis.hide_bili_player } fullscreen = "xl-down" size = "xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          { Title }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className = { styles.biliPlayerDiv }>
          <p className = { styles.bvid_bar }>{ List.map((bvid) => (
            <span
              className = { ( Selected === bvid
                            ? styles.bvid_bar__item + ' ' + styles.bvid_bar__item__inactive
                            : styles.bvid_bar__item
                          ) }

              onClick = { e => eff_set(EffThis, 'bvid_selected', e.currentTarget.textContent) }
              
              key = { bvid }
            >
              { bvid }
            </span>)) }
          </p>
          <iframe src = { bvid_url(Selected) } width = "100%" height = "100%" scrolling = "no" border = "0" frameBorder = "no" allowFullScreen = { true }>
          </iframe>
        </div>
      </Modal.Body>
    </Modal>
  )
}
