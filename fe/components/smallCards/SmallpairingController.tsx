import SmallPairingCard from './SmallPairingCard';
import React, { useState } from 'react';

export interface PairingCardInfo {
  id: number;
  pairing: string;
  nickName: string;
  description?: string;
  date: string;
  comments: number;
  thumbs: number;
  image?: string;
}

export default function SmallCardController(props: {
  pairProps: PairingCardInfo[];
}) {
  const [smallPairingList, setSmallPairingList] = useState<PairingCardInfo[]>(
    props.pairProps
  );

  return (
    <div className="grid grid-cols-2 gap-3 px-3">
      {smallPairingList?.map((pairingProps: PairingCardInfo, idx: number) => (
        <SmallPairingCard
          pairingProps={pairingProps}
          idx={idx}
          key={pairingProps.id.toString()}
        />
      ))}
    </div>
  );
}
