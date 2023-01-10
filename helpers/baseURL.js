let BASE_URL;
if (typeof window !== "undefined") {
  // BASE_URL = 'http://192.168.1.115:8000'
  BASE_URL = "https://back.gis.uz";
} else {
  // BASE_URL = 'http://192.168.1.115:8000'
  BASE_URL = "http://back.gis.uz";
}

export default BASE_URL;
