import { useQuery } from "@tanstack/react-query";
import { client } from "../client";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/diagnose-analysis`;

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

const useHypertensionPyramid = ({ query = {}, options }: any = {}) => {
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

const useHypertensionDistributionMap = ({ query = {}, options }: any = {}) => {
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

const usePatientUnderTreatment = ({ query = {}, options }: any = {}) => {
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

const usePatientLostFollowUp = ({ query = {}, options }: any = {}) => {
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

const useControlledPatientIn3Month = ({ query = {}, options }: any = {}) => {
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

const useUncontrolledPatientIn3Month = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["uncontrolled-patient-in-3-month", query],
    queryFn: () => fetchUncontrolledPatientIn3Month({ query }),
    ...options,
  });
};

export {
  useTotalParticipant,
  useTotalVisitation,
  useHypertensionPyramid,
  useHypertensionDistributionMap,
  usePatientUnderTreatment,
  usePatientLostFollowUp,
  useControlledPatientIn3Month,
  useUncontrolledPatientIn3Month,
};
