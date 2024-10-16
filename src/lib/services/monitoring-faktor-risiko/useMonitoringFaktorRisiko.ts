import { API_BASE_URL_BADR_PTM } from "@/helpers/config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "../client";
import {
  DataResponeTotalParticipantType,
  DataResponseActivityType,
  DataResponseConsumptionType,
  DataResponseSmokingType,
  DataResponseTableAggregateType,
} from "@/view/dashboard/monitoring-faktor-risiko/type";

const baseUrl = `${API_BASE_URL_BADR_PTM}/risk-factor-monitoring`;

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

const fetchActivity = async ({ query = {} }) => {
  return client("/activity", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useActivity = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponseActivityType,
  Error
> => {
  return useQuery({
    queryKey: ["activity", query],
    queryFn: () => fetchActivity({ query }),
    ...options,
  });
};

const fetchConsumption = async ({ query = {} }) => {
  return client("/consumption", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useConsumption = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponseConsumptionType,
  Error
> => {
  return useQuery({
    queryKey: ["consumption", query],
    queryFn: () => fetchConsumption({ query }),
    ...options,
  });
};

const fetchSmoking = async ({ query = {} }) => {
  return client("/smoking", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useSmoking = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponseSmokingType,
  Error
> => {
  return useQuery({
    queryKey: ["smoking", query],
    queryFn: () => fetchSmoking({ query }),
    ...options,
  });
};

const fetchTableAggregate = async ({ query = {} }) => {
  return client("/table-aggregate", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useTableAggregate = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponseTableAggregateType,
  Error
> => {
  return useQuery({
    queryKey: ["table-aggregate", query],
    queryFn: () => fetchTableAggregate({ query }),
    ...options,
  });
};

export {
  useTableAggregate,
  useActivity,
  useConsumption,
  useSmoking,
  useTotalParticipant,
  useTotalVisitation,
};
