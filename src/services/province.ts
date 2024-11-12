import axios from "axios";

const API_URL = import.meta.env.VITE_API_PROVINCE;

class Provinces {
  searchProvice = async () => {
    const res = await fetch("/src/resources/provinces.json");
    const data = await res.json();
    return data.data;
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
    ward: string;
  }) => {
    const { province, district, ward } = params;
    let id = province;
    if (ward != "0") {
      id = ward;
    } else if (district != "0") {
      id = district;
    }

    let res = await axios.get(API_URL + `/5/${id}.htm`);

    let location = res.data.data.full_name;
    return location;
  };
}

export const provinceService = new Provinces();
