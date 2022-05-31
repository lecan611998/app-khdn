import { baseData, baseUrl } from "./utils";
import axios from "axios";
import { _removeData, _retrieveData, _storeData } from "../utils/Storage";
import { POST, GET, PUT, DELETE } from "./method";
import { getToken } from './emp'

export const getReportByUnit = async (branchCode, shopCode) => {
  let data = {
    message: "",
    status: "",
    data: null,
    loading: null,
    error: null
  };

  const params = {
    "branchCode": branchCode,
    "shopCode": shopCode
  }

  await axios({
    method: "POST",
    url: `${baseUrl}manager/sub/getReportByUnit`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
    data: params
  })
    .then((res) => {
      if (res.status == 200) {
        data = {
          data: res.data,
          loading: false,
          status: "success",
          length: res.data.data.length,
          error: null
        };
      }
    }).catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          loading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
}

export const getReportByEmp = async () => {
  let data = {
    message: "",
    status: "",
    data: null,
    loading: null,
    length: 0,
    error: null
  };

  await axios({
    method: "POST",
    url: `${baseUrl}manager/sub/getReportByEmp`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    }
  })
    .then((res) => {
      if (res.status == 200) {
        data = {
          data: res.data,
          isLoading: false,
          status: "success",
          length: res.data.data.data.length,
          error: null
        };
      }
    }).catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
}

export const getSalaryByMonth = async (month, branchCode, shopCode) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken;
    } else {
      //   navigation.navigate("SignIn");
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    length: 0,
    loading: null,
    error: null,
  };
  let body = {
    branchCode: branchCode,
    month: month,
    shopCode: shopCode
  }

  await axios({
    method: "POST",
    url: `${baseUrl}manager/salary/getSalaryByMonth`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken()
    },
    data: body
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
        } else {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data.data).length,
            error: null,
          }
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data,
        };
      }
    });
  return data;
};


export const getAvgIncome = async (beginMonth, endMonth, branchCode, shopCode) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken;
    } else {
      //   navigation.navigate("SignIn");
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    length: 0,
    loading: null,
    error: null,
  };
  let body = {
    beginMonth: beginMonth,
    endMonth: endMonth,
    branchCode: branchCode,
    shopCode: shopCode
  }

  await axios({
    method: "POST",
    url: `${baseUrl}manager/salary/getAvgIncome`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken()
    },
    data: body
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
        } else {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data.data).length,
            error: null,
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data,
        };
      }
    });
  return data;
};

// export const getDetailOutcome = async (navigation, beginMonth, endMonth) => {
//   console.log("Home > Lương theo tháng > Quản lý chi phí > Chi tiết mục chi from " + beginMonth + " to " + endMonth);
//   let token = "";
//   await _retrieveData("userInfo").then((data) => {
//     if (data != null) {
//       token = data.accessToken
//     } else {
//       navigation.navigate("SignIn")
//     }
//   });
//   let data = {
//     message: "",
//     status: "",
//     data: null,
//     isLoading: null,
//     length: 0,
//     error: null
//   };
//   console.log(token)
//   await axios({
//     method: GET,
//     url: `http://hochiminh.mobifone.vn/luongGDV/api/adminScreens/getDetailOutcome?beginMonth=01/${beginMonth}&endMonth=01/${endMonth}`,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `4b29214a-db1f-492d-9a1a-8627f916dadf`,
//       // Authorization: `${token}`,
//     },
//   }).then((res) => {
//     if (res.status == 200) {
//       if (res.data.V_ERROR) {
//         data = {
//           message: "Chức năng này đang được bảo trì",
//           data: null,
//           isLoading: false,
//           status: "v_error",
//           length: 0,
//           error: null
//         }
//       } else if (res.data.data.length > 0) {
//         data = {
//           data: res.data,
//           isLoading: false,
//           status: "success",
//           length: res.data.data.length,
//           error: null
//         };
//       } else {
//         data = {
//           data: res.data,
//           isLoading: false,
//           message: text.dataIsNull,
//           status: "success",
//           length: res.data.data.length,
//           error: null
//         };
//       }

//     }
//   }).catch((error) => {
//     if (error) {
//       data = {
//         message: error.response && error.response.data.message,
//         isLoading: false,
//         status: "failed",
//         length: 0,
//         data: null,
//         error: error
//       };
//     }
//   });
//   return data;
// }
export const getTopAm = async (branchCode, month, shopCode, sort) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getTopAM`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
    data: {
      branchCode: branchCode,
      month: month,
      shopCode: shopCode,
      sort: sort
    }
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};
export const getListBranch = async () => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getListBranch`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};
export const getListLeader = async (shopcode) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getListLeader?shopCode=${shopcode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};

export const getListGroupKPI = async (month) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getListGroupKPI?month=${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};

export const getListDeliveEnterprise = async (month) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getListDeliveEnterprise?month=${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};

export const getListDetailDE = async (month, code) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getListDetailDE`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
    data: { month: month, shopCode: code }
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};

export const getListSubsEnterprise = async (month) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getListSubsEnterprise?month=${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};
export const getListDetailSE = async (month, code) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getListDetailSE`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
    data: { month: month, shopCode: code }
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};
export const getListRevenueEnterprise = async (month) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getListRevenueEnterprise?month=${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};
export const getListDetailsRE = async (month, code) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getListDetailsRE`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
    data: { month: month, shopCode: code }
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};
export const getProductivitySubAdmin = async (branchCode, month, shopCode) => {
  let data = baseData
  await axios({
    method: "POST",
    url: `${baseUrl}manager/kpi/getProductivitySub`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: await getToken(),
    },
    data: {
      branchCode: branchCode,
      month: month,
      shopCode: shopCode
    }
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            error: null
          };
        }
      }
    })
    .catch(async (error) => {
      console.log(error)
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        error: error
      };
    });
  return data;
};
