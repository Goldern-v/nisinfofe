/**
* 获取字符串字节长度
export
*/
export const getBytesLength = (text) => {
 let totalLength = 0;
 let charCode;
 text.split('').map(v => {
   charCode = v.charCodeAt();
   if (charCode < 0x007f) {
     totalLength++;
   } else if (0x0080 <= charCode && charCode <= 0x07ff) {
     totalLength += 2;
   } else if (0x0800 <= charCode && charCode <= 0xffff) {
     totalLength += 3;
   } else {
     totalLength += 4;
   }
 });
 return totalLength;
}
