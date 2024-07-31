"use client";

import React from "react";
import { Banner, BannerHighlightFooter, BannerText } from "@/components";
import {
  graphOptions1,
  graphOptions2,
  graphOptions3,
  graphOptions4,
  graphOptions5,
  graphOptions6,
  graphOptions7,
} from "./graphOptions";
import GraphEchartsAnc from "@/components/graph-echarts-anc";
import {
  ancGraphOptions1,
  ancGraphOptions2,
  ancGraphOptions3,
  ancGraphOptions4,
  ancGraphOptions6,
  ancGraphOptions7,
  ancGtaphOptions5,
  dataMonth,
} from "@/utils/constants";
import { formatNumber } from "@/helpers";
import Header from "@/components/header";
import styles from "./anc.module.css";

export default function IncPnc() {
  const totalData = ancGraphOptions1.map((option) => option.ya + option.tidak);
  return (
    <div className={`flex flex-col p-[30px]  ${styles.jakartaFont}`}>
      <Header
        title={`Dashboard\nMonev ASIK`}
        subtitle="Layanan Ibu Bersalin dan Ibu Nifas di Puskesmas"
        desc={`Dashboard ini menampilkan monitoring data yang diterima dari hasil pencatatan ibu bersalin dan ibu nifas di SATUSEHAT`}
        space={false}
      />

      {/* filter section */}
      <section className="container mt-[39px]">
        <h3 className="text-lg leading-6 text-[#525252]">Filter</h3>
      </section>

      {/* layanan ibu bersalin */}
      <section className="container mt-10">
        <div>
          <h3 className="text-[#424242] font-bold text-2xl">
            Layanan Ibu Bersalin
          </h3>
          <p className="text-[#424242] font-medium text-base">
            Cakupan dan persentase ibu bersalin tercatat
          </p>
        </div>
      </section>

      {/* layanan ibu nifas */}
      <section className="container mt-10">
        <div>
          <h3 className="text-[#424242] font-bold text-2xl">
            Layanan Ibu Nifas
          </h3>
          <p className="text-[#424242] font-medium text-base">
            Cakupan dan persentase ibu nifas tercatat
          </p>
        </div>
      </section>

      {/* peta sebaran */}
      <section className="container mt-10">
        <div>
          <h3 className="text-[#424242] font-bold text-2xl">Peta Sebaran</h3>
          <p className="text-[#424242] font-medium text-base">
            Peta sebaran capaian indikator ibu bersalin dan ibu nifas
          </p>
        </div>
      </section>

      {/* jumlah dan persentase indikator ibu melahirkan ibu nifas */}
      <section className="container mt-10">
        <div>
          <h3 className="text-[#424242] font-bold text-2xl">
            Jumlah dan Persentase Indikator Ibu Melahirkan, Ibu Nifas
          </h3>
          <p className="text-[#424242] font-medium text-base">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
            quod!
          </p>
        </div>
      </section>

      {/* jumlah capaian ibu melahirkan dan ibu nifas yang dilayani */}
      <section className="container mt-10">
        <div>
          <h3 className="text-[#424242] font-bold text-2xl">
            Jumlah Capaian Ibu Melahirkan dan Ibu Nifas yang Dilayani
          </h3>
          <p className="text-[#424242] font-medium text-base">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
            quod!
          </p>
        </div>
      </section>

      {/* jumlah % persetnase program ibu melahirkan dan ibu nifas */}
      <section className="container mt-10">
        <div>
          <h3 className="text-[#424242] font-bold text-2xl">
            Jumlah % Persentase Program Ibu Melahirkan dan Ibu Nifas
          </h3>
          <p className="text-[#424242] font-medium text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
            harum!
          </p>
        </div>
      </section>
    </div>
  );
}
