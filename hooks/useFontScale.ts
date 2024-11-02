import { useEffect, useState } from 'react';
import { PixelRatio } from 'react-native';

export function useFontScale() {
  const [fontScale, setFontScale] = useState(1);
  useEffect(() => {
    const fetchFontScale = async () => {
      const scale = await PixelRatio.getFontScale();
      setFontScale(scale);
    };

    fetchFontScale();
  }, []);
  return fontScale;
}
