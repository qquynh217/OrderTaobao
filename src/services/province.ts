import axios from "axios";

const API_URL = import.meta.env.VITE_API_PROVINCE;

class Provinces {
  getProvince = async (id: string) => {
    const res = await fetch("provinces.json");
    const data = await res.json();
    return data.data.find((item: any) => item.id == id);
  };

  searchProvice = async () => {
    const res = await fetch("provinces.json");
    const data = await res.json();
    const province = data.data.sort((a: any, b: any) => {
      if (a.id == "01" && b.id != "01") return -1;
      if (b.id == "01" && a.id != "01") return 1;
      if (a.id == "79" && b.id != "01" && b.id != "79") return -1;
      if (b.id == "79" && a.id != "01" && a.id != "79") return 1;
      return 0;
    });
    return province;
  };

  getDistrictsOfProvince = async (params: { province: string | number }) => {
    let res = await axios.get(API_URL + `/2/${params.province}.htm`);
    if (res.status == 200) {
      return res.data.data || [];
    } else {
      return [];
    }
  };
  getWardOfDistrict = async (params: { district: string | number }) => {
    let res = await axios.get(API_URL + `/3/${params.district}.htm`);
    if (res.status == 200) {
      return res.data.data || [];
    } else {
      return [];
    }
  };
  getLocationText = async (params: {
    province: string;
    district: string;
    field?: string;
  }) => {
    const field = params.field || "full_name";
    const { province, district } = params;
    let id = province;
    if (district != "0") {
      id = district;
    }

    let res = await axios.get(API_URL + `/5/${id}.htm`);

    let location = res.data.data[field];
    return location;
  };
}

export const provinceService = new Provinces();
