import PageContainer from '@/components/PageContainer';
import { useEffect, useState } from 'react';
import MapNav from '@/components/map/MapNav';
import MapStore from '@/components/map/MapStore';

export default function StoreMap() {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0,
    };
    function success(pos: any) {
      const crd = pos.coords;
      setLatitude(crd.latitude);
      setLongitude(crd.longitude);
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <PageContainer>
      <MapNav curTab={0} />
      <div className="w-full h-full">
        <MapStore latitude={latitude} longitude={longitude} />
      </div>
    </PageContainer>
  );
}
