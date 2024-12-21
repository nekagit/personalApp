import SOPPic from '@/assets/SOP/img/imgs/kros 2022/1.jpeg'
import SOPPic1 from '@/assets/SOP/img/imgs/kros 2022/2.jpeg'
import SOPPic2 from '@/assets/SOP/img/imgs/kros 2022/3.jpeg'
import SOPPic3 from '@/assets/SOP/img/imgs/kros 2022/4.jpeg'
import SOPPic4 from '@/assets/SOP/img/imgs/kros 2022/5.jpeg'
import SchoolPic from '@/assets/SOP/img/skola/1.jpeg'
import SchoolPic1 from '@/assets/SOP/img/skola/2.jpeg'
import SchoolPic2 from '@/assets/SOP/img/skola/3.jpeg'
import SchoolPic3 from '@/assets/SOP/img/skola/4.jpeg'
import SchoolPic4 from '@/assets/SOP/img/skola/5.jpeg'
import BoxProf from '@/assets/SOP/sportPage/boxProf.jpg'
import BoxPic from '@/assets/SOP/img/imgs/boks/1.jpeg'
import BoxPic1 from '@/assets/SOP/img/imgs/boks/2.jpeg'
import BoxPic2 from '@/assets/SOP/img/imgs/boks/3.jpeg'
import BoxPic3 from '@/assets/SOP/img/imgs/boks/4.jpeg'
import BoxPic4 from '@/assets/SOP/img/imgs/boks/5.jpeg'
import Sponsors from '@/assets/SOP/img/logoo.png'
import Kros from '@/assets/SOP/sportPage/kros.png'
import fudbalProf from '@/assets/SOP/sportPage/fudbalProf.webp'
import atletikProf from '@/assets/SOP/sportPage/atletikProf.jpg'
import plivanjefirst from '@/assets/SOP/sportPage/plivanjefirst.jfif'

import SOP1 from '@/assets/SOP/sopGallery/444202854_469071172459524_2891403541255338334_n.jpg'
import SOP2 from '@/assets/SOP/sopGallery/WhatsApp Bild 2024-05-21 um 11.57.53_f109ab3a.jpg'
import SOP3 from '@/assets/SOP/sopGallery/fubalposter.jpg'
import SOP4 from '@/assets/SOP/sopGallery/konopceposter.jpg'
import SOP5 from '@/assets/SOP/sopGallery/starifudbalposter.jpg'

import KROS1 from '@/assets/SOP/krosGallery/kros.png'
import KROS2 from '@/assets/SOP/krosGallery/kros2018.jfif'
import KROS3 from '@/assets/SOP/krosGallery/kros20184.jfif'
import KROS4 from '@/assets/SOP/krosGallery/kros20192.jfif'
import KROS5 from '@/assets/SOP/krosGallery/kros20193.jfif'
import KROS6 from '@/assets/SOP/krosGallery/krosSpende.png'

import FUDBAL1 from '@/assets/SOP/soccerGallery/1.jpeg'
import FUDBAL2 from '@/assets/SOP/soccerGallery/2.jpeg'
import FUDBAL3 from '@/assets/SOP/soccerGallery/3.jpeg'
import FUDBAL4 from '@/assets/SOP/soccerGallery/4.jpeg'
import FUDBAL5 from '@/assets/SOP/soccerGallery/5.jpeg'

import BOX1 from '@/assets/SOP/boxGallery/1.jpeg'
import BOX2 from '@/assets/SOP/boxGallery/2.jpeg'
import BOX3 from '@/assets/SOP/boxGallery/3.jpeg'
import BOX4 from '@/assets/SOP/boxGallery/4.jpeg'
import BOX5 from '@/assets/SOP/boxGallery/5.jpeg'

import ATLETIK1 from '@/assets/SOP/atletikGallery/1.jpeg'
import ATLETIK2 from '@/assets/SOP/atletikGallery/2.jpeg'
import ATLETIK3 from '@/assets/SOP/atletikGallery/3.jpeg'
import ATLETIK4 from '@/assets/SOP/atletikGallery/4.jpeg'
import ATLETIK5 from '@/assets/SOP/atletikGallery/5.jpeg'

import PLIVANJE1 from '@/assets/SOP/plivanjeGallery/1.jpeg'
import PLIVANJE2 from '@/assets/SOP/plivanjeGallery/2.jpeg'
import PLIVANJE3 from '@/assets/SOP/plivanjeGallery/3.jpeg'
import PLIVANJE4 from '@/assets/SOP/plivanjeGallery/4.jpeg'
import PLIVANJE5 from '@/assets/SOP/plivanjeGallery/5.jpeg'

export default function ImageHelper() {
  const sopGallery = [SOPPic, SOPPic1, SOPPic2, SOPPic3, SOPPic4]
  const sportGallery = [BoxPic, BoxPic1, BoxPic2, BoxPic3, BoxPic4]
  const schoolGallery = [SchoolPic, SchoolPic1, SchoolPic2, SchoolPic3, SchoolPic4]
  const sportPage = [Sponsors, Kros, fudbalProf, BoxProf, atletikProf, plivanjefirst]
  const sportPageSectionImages = [
    [SOP1, SOP2, SOP3, SOP4, SOP5],
    [KROS1, KROS2, KROS3, KROS4, KROS5, KROS6],
    [FUDBAL1, FUDBAL2, FUDBAL3, FUDBAL4, FUDBAL5],
    [BOX1, BOX2, BOX3, BOX4, BOX5],
    [ATLETIK1, ATLETIK2, ATLETIK3, ATLETIK4, ATLETIK5],
    [PLIVANJE1, PLIVANJE2, PLIVANJE3, PLIVANJE4, PLIVANJE5]
  ]
  return { sopGallery, sportGallery, schoolGallery, sportPage, sportPageSectionImages }
}
