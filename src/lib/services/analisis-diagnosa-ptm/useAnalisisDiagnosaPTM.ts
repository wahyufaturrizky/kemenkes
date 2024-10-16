import { API_BASE_URL_BADR_PTM } from "@/helpers/config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "../client";
import {
  DataResponeActivityPyramidType,
  DataResponeActivityCheckDistributionType,
} from "@/view/dashboard/analisis-faktor-risiko/type";
import {
  DataResponeControlledPatientIn3MonthType,
  DataResponeDataResponeUncontrolledPatientIn3MonthTypeType,
  DataResponeHypertensionDistributionMapType,
  DataResponeHypertensionPyramidType,
  DataResponePatientLostFollowUpType,
  DataResponePatientUnderTreatmentType,
} from "@/view/dashboard/analisis-diagnosa-ptm/type";

const baseUrl = `${API_BASE_URL_BADR_PTM}/diagnose-analysis`;

const fetchTotalParticipant = async ({ query = {} }) => {
  return client("/total-participant", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useTotalParticipant = ({ query = {}, options }: any = {}) => {
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

const fetchHypertensionPyramid = async ({ query = {} }) => {
  return client("/hypertension-pyramid", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useHypertensionPyramid = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponeHypertensionPyramidType,
  Error
> => {
  return useQuery({
    queryKey: ["hypertension-pyramid", query],
    queryFn: () => fetchHypertensionPyramid({ query }),
    ...options,
  });
};

const fetchHypertensionDistributionMap = async ({ query = {} }) => {
  return client("/hypertension-distribution-map", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useHypertensionDistributionMap = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponeHypertensionDistributionMapType,
  Error
> => {
  return useQuery({
    queryKey: ["hypertension-distribution-map", query],
    queryFn: () => fetchHypertensionDistributionMap({ query }),
    ...options,
  });
};

const fetchPatientUnderTreatment = async ({ query = {} }) => {
  return client("/patient-under-treatment", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const usePatientUnderTreatment = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponePatientUnderTreatmentType,
  Error
> => {
  return useQuery({
    queryKey: ["patient-under-treatment", query],
    queryFn: () => fetchPatientUnderTreatment({ query }),
    ...options,
  });
};

const fetchPatientLostFollowUp = async ({ query = {} }) => {
  return client("/patient-lost-follow-up", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const usePatientLostFollowUp = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponePatientLostFollowUpType,
  Error
> => {
  return useQuery({
    queryKey: ["patient-lost-follow-up", query],
    queryFn: () => fetchPatientLostFollowUp({ query }),
    ...options,
  });
};

const fetchControlledPatientIn3Month = async ({ query = {} }) => {
  return client("/controlled-patient-in-3-month", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useControlledPatientIn3Month = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponeControlledPatientIn3MonthType,
  Error
> => {
  return useQuery({
    queryKey: ["controlled-patient-in-3-month", query],
    queryFn: () => fetchControlledPatientIn3Month({ query }),
    ...options,
  });
};

const fetchUncontrolledPatientIn3Month = async ({ query = {} }) => {
  return client("/uncontrolled-patient-in-3-month", {
    apiURL: baseUrl,
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useUncontrolledPatientIn3Month = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponeDataResponeUncontrolledPatientIn3MonthTypeType,
  Error
> => {
  return useQuery({
    queryKey: ["uncontrolled-patient-in-3-month", query],
    queryFn: () => fetchUncontrolledPatientIn3Month({ query }),
    ...options,
  });
};

export {
  useControlledPatientIn3Month,
  useHypertensionDistributionMap,
  useHypertensionPyramid,
  usePatientLostFollowUp,
  usePatientUnderTreatment,
  useTotalParticipant,
  useTotalVisitation,
  useUncontrolledPatientIn3Month,
};
