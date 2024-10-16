import { API_BASE_URL_BADR_PTM } from "@/helpers/config";
import {
  DataResponeActivityBasedOnRegionType,
  DataResponeActivityCheckDistributionType,
  DataResponeActivityPyramidType,
} from "@/view/dashboard/analisis-faktor-risiko/type";
import { DataResponeTotalParticipantType } from "@/view/dashboard/monitoring-faktor-risiko/type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "../client";

const baseUrl = `${API_BASE_URL_BADR_PTM}/risk-factor-analysis`;

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

const fetchActivityPyramid = async ({ query = {} }) => {
  return client("/activity-pyramid", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useActivityPyramid = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponeActivityPyramidType,
  Error
> => {
  return useQuery({
    queryKey: ["activity-pyramid", query],
    queryFn: () => fetchActivityPyramid({ query }),
    ...options,
  });
};

const fetchActivityCheckDistribution = async ({ query = {} }) => {
  return client("/activity-check-distribution", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useActivityCheckDistribution = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponeActivityCheckDistributionType,
  Error
> => {
  return useQuery({
    queryKey: ["activity-check-distribution", query],
    queryFn: () => fetchActivityCheckDistribution({ query }),
    ...options,
  });
};

const fetchActivityBasedOnRegion = async ({ query = {} }) => {
  return client("/activity-based-on-region", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useActivityBasedOnRegion = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponeActivityBasedOnRegionType,
  Error
> => {
  return useQuery({
    queryKey: ["activity-based-on-region", query],
    queryFn: () => fetchActivityBasedOnRegion({ query }),
    ...options,
  });
};

export {
  useActivityBasedOnRegion,
  useActivityCheckDistribution,
  useActivityPyramid,
  useTotalParticipant,
  useTotalVisitation,
};
