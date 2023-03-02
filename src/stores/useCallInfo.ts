import { create } from 'zustand';
import { CallStatus } from '../utils/enum/callStatuses';


interface ClientData {
  claim_id: string;
  client_id: string;
  dt_signature: string;
  email: string | null;
  name: string | null;
}

interface CallData {
  to: string;
  from: string;
  org_phone_id: string;
  operator_id: string;
  client: ClientData;
}

interface CallInfo {
  call_id: string;
  call_dt: number;
  call_status: CallStatus;
  call_data: CallData;
}

interface CallInfoStore extends CallInfo {
  updateCallInfo: (newInfo: CallInfo) => void;
}

export const useCallInfoStore = create<CallInfoStore>((set) => ({
  call_id: '',
  call_dt: 0,
  call_status: CallStatus.WAITING,
  call_data: {
    to: '',
    from: '',
    org_phone_id: '',
    operator_id: '',
    client: {
      claim_id: '',
      client_id: '',
      dt_signature: '',
      email: null,
      name: null,
    },
  },
  updateCallInfo: (newInfo: CallInfo) => set(newInfo),
}));
