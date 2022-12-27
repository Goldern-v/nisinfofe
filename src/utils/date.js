/**格式时间 */

import moment from "moment";

export const formatAsStr = (val, text = 'YYYY-MM-DD') =>
val ? moment(val).format(text) : '';
