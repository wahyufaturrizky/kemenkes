"use-client";

import React from "react";
import styles from "../ptm.module.css";
import HeaderPTM from "@/components/header-ptm";

export default function EarlyDetectionMonitoring() {
  return (
    <div
      className={`flex flex-col items-center p-[30px] ${styles.jakartaFont}`}
    >
      <HeaderPTM
        title={`Dashboard\nCapaian SATUSEHAT`}
        subtitle="Pengendalian Penyakit Tidak Menular (PTM) - Deteksi Dini"
        desc="Dashboard ini menampilkan capaian hasil skrining/deteksi dini Penyakit Tidak Menular (PTM) berdasarkan data yang dikirim oleh Fasyankes ke SATUSEHAT"
        space={true}
        miniDesc={`Dashboard ini menampilkan data berdasarkan pemeriksaan pertama dari setiap jenis\nskrining PTM yang dilakukan peserta dalam 1 tahun`}
        updateTime="12/12/2024"
      />
      EarlyDetectionMonitoring View
    </div>
  );
}
