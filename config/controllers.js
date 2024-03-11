import { toast } from 'react-toastify'
import copy from 'copy-to-clipboard'

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
