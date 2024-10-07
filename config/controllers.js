import { toast } from 'react-toastify'
import copy from 'copy-to-clipboard'
import Cookies from 'js-cookie';

const copy_show_text_max_count = 100;

const global_controllers = {
  // 处理用户复制行为
  copy_to_clipboard: text => {
    if (typeof text !== 'string' || !text.length) return;
    copy(`${text}`);
    toast.success( `${ (text.length < copy_show_text_max_count)
                        ?text
                        :text.substring(0, copy_show_text_max_count) + '...'
                    } 成功复制到剪贴板!` );
  }
};

export const eff_get = (eff_this, key) => eff_this[key][0];

export const eff_set = (eff_this, key, value) => eff_this[key][1](value);

export default global_controllers

export const get_artwork_url = (bvid_list) => {
  let artwork_url = '/favicon.png';
  if (bvid_list !== null && bvid_list.length > 0) {
    let latest_bvid = bvid_list[bvid_list.length - 1];
    if (latest_bvid.endsWith("，")) {
      latest_bvid = latest_bvid.slice(0, -1);
    }
    if (latest_bvid.length > 0) {
      artwork_url = `https://api.suij1sui.space/api/v1/video/info?bvid=${latest_bvid}&pic=1`;
    }
  }
  return artwork_url;
}

export const latest_date = (date) => {
  let date_list = date.split(/，/g)
  return date_list[date_list.length - 1];
}

export const is_favorite_song = (name) => {
  return typeof window !== 'undefined'
    && localStorage.getItem(name) !== null;
}

export const toggle_favorite_song = (name, current, f) => {
  if (typeof window !== 'undefined') {
    if (current) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, Date.now());
    }
    f(!current);
  }
}

