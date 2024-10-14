import { API_BASE_URL_BADR_PTM } from "@/helpers/config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "../client";
import { DataResponeTotalParticipantType } from "@/view/dashboard/monitoring-faktor-risiko/type";

const baseUrl = `${API_BASE_URL_BADR_PTM}/diagnose-monitoring`;

const fetchTotalParticipant = async ({ query = {} }) => {
  return client("/total-participant", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useTotalParticipant = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponeTotalParticipantType,
  Error
> => {
  return useQuery({
    queryKey: ["total-participant", query],
    queryFn: () => fetchTotalParticipant({ query }),
    ...options,
  });
};

const fetchTotalVisitation = async ({ query = {} }) => {
  return client("/total-visitation", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useTotalVisitation = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["total-visitation", query],
    queryFn: () => fetchTotalVisitation({ query }),
    ...options,
  });
};

const fetchDisease = async ({ query = {} }) => {
  return client("/disease", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useDisease = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["disease", query],
    queryFn: () => fetchDisease({ query }),
    ...options,
  });
};

const fetchBloodDisorder = async ({ query = {} }) => {
  return client("/blood-disorder", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useBloodDisorder = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["blood-disorder", query],
    queryFn: () => fetchBloodDisorder({ query }),
    ...options,
  });
};

const fetchThalassema = async ({ query = {} }) => {
  return client("/thalassema", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useThalassema = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["thalassema", query],
    queryFn: () => fetchThalassema({ query }),
    ...options,
  });
};

const fetchHearingDisorder = async ({ query = {} }) => {
  return client("/hearing-disorder", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useHearingDisorder = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["hearing-disorder", query],
    queryFn: () => fetchHearingDisorder({ query }),
    ...options,
  });
};

const fetchVisualDisorder = async ({ query = {} }) => {
  return client("/visual-disorder", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useVisualDisorder = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["visual-disorder", query],
    queryFn: () => fetchVisualDisorder({ query }),
    ...options,
  });
};

const fetchPPOK = async ({ query = {} }) => {
  return client("/ppok", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const usePPOK = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["ppok", query],
    queryFn: () => fetchPPOK({ query }),
    ...options,
  });
};

export {
  useBloodDisorder,
  useDisease,
  useHearingDisorder,
  usePPOK,
  useThalassema,
  useTotalParticipant,
  useTotalVisitation,
  useVisualDisorder,
};
