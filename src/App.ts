import 'utils/laya.custom';
import 'ui/layaUI.max.all';

import SenseManager from 'utils/SenseManager';
import LoaddingSense from "senses/LoaddingSense";
import { COMMON_ASSET } from 'const/assets';

const { Stage, Handler } = Laya;

export default function App() {
  Laya.init(1334, 750, Laya.WebGL);
  const stage = Laya.stage;
  stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
  stage.alignH = Stage.ALIGN_CENTER;
  stage.alignV = Stage.ALIGN_MIDDLE;
  stage.screenMode = Stage.SCREEN_HORIZONTAL;
  stage.bgColor = '#46ABFC';

  Laya.loader.load(
    COMMON_ASSET,
    Handler.create(null, () => {
      SenseManager.loadSense('/loadding');
    }),
  );
}
