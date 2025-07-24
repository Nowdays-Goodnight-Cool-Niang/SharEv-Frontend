import Graphic1 from '@/assets/images/img_graphic_1.png';
import Graphic2 from '@/assets/images/img_graphic_2.png';
import Graphic3 from '@/assets/images/img_graphic_3.png';
import Graphic4 from '@/assets/images/img_graphic_4.png';
import Graphic5 from '@/assets/images/img_graphic_5.png';
import Graphic6 from '@/assets/images/img_graphic_6.png';
import Graphic7 from '@/assets/images/img_graphic_7.png';
import Graphic8 from '@/assets/images/img_graphic_8.png';
import Graphic9 from '@/assets/images/img_graphic_9.png';
import Graphic10 from '@/assets/images/img_graphic_10.png';
import Graphic11 from '@/assets/images/img_graphic_11.png';
import Graphic12 from '@/assets/images/img_graphic_12.png';

const graphicMap: Record<number, string> = {
  1: Graphic1,
  2: Graphic2,
  3: Graphic3,
  4: Graphic4,
  5: Graphic5,
  6: Graphic6,
  7: Graphic7,
  8: Graphic8,
  9: Graphic9,
  10: Graphic10,
  11: Graphic11,
  12: Graphic12,
};

export function getGraphicImageByNumber(num: number): string | undefined {
  return graphicMap[num];
}
