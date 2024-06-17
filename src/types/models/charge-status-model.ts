enum EChargeStatus {
  "EMAIL-SENT",
  "PROCESSED",
  "BILLET-CREATED",
}

type IChargeStatus = keyof typeof EChargeStatus;

type ChargeStatusTranslation<T> = {
  [k in IChargeStatus]: T;
};

export const chargeLabel: ChargeStatusTranslation<{
  color: string;
}> = {
  "EMAIL-SENT": {
    color: "text-green-600 bg-green-50",
  },
  PROCESSED: {
    color: "text-blue-600 bg-blue-50",
  },
  "BILLET-CREATED": {
    color: "text-pink-600 bg-pink-50",
  },
};
