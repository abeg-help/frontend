export type JSONContent = {
  [key: string]: NonNullable<unknown> | undefined;
  type?: string;
  attrs?: Record<string, NonNullable<unknown>>;
  content?: JSONContent[];

  marks?: Array<{
    [key: string]: NonNullable<unknown> | undefined;
    type: string;
    attrs?: JSONContent["attrs"];
  }>;

  text?: string;
};

export type StepOneData = {
  fundraiserCategory: string;
  country: string;
  campaignTags: string[];
};

export type StepTwoData = {
  campaignTitle: string;
  fundraiserTarget: string;
  campaignGoal: string;
  campaignDeadline: Date;
};

export type StepThreeData = {
  campaignImageFiles: File[];
  campaignStory: string;
};

type SetDataParams =
  | { step: 1; data: Partial<StepOneData> }
  | { step: 2; data: Partial<StepTwoData> }
  | { step: 3; data: Partial<StepThreeData> };

export type FormStore = {
  currentStep: SetDataParams["step"];
  stepOneData: StepOneData | null;
  stepTwoData: StepTwoData | null;
  stepThreeData: StepThreeData | null;

  goToStep: (step: FormStore["currentStep"]) => void;

  setData: (paramsObj: SetDataParams) => void;

  initializeStoreData: (
    storeData: Omit<FormStore, "setData" | "initializeStoreData">,
  ) => void;
};

export type SelectorFn<TState> = (state: FormStore) => TState;
