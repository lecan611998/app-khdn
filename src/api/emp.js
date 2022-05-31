import { _removeData, _retrieveData, _storeData } from "../utils/Storage";
import { baseData, baseUrl } from "./utils";
import axios from "axios";
import { useNavigation } from '@react-navigation/core';


export const checkToken = async () => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}check-token?token=${await getToken()}`,
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
                    await _storeData("accessToken", res.data.accessToken);
                }
            }
        })
        .catch(async (error) => {
            data = {
                message: error.response.data.message,
                isLoading: false,
                status: "failed",
                error: error
            };
        });
    return data;
}
export const getToken = async () => {
    let token = await _retrieveData("accessToken")
    return token
}
export const check403 = async (error, navigation) => {
    if (error?.response?.status == 403) {
        // alert("test")
        await _removeData("isLogin")
        setTimeout(() => {
            navigation.navigate("SignIn")
        }, 1000);
    }
}
export const login = async (userName, password) => {
    let data = baseData
    await axios({
        method: "GET",
        url: `${baseUrl}login?password=${password}&userName=${userName}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "token",
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
                    await _storeData("accessToken", res.data.accessToken);
                }
            }
        })
        .catch(async (error) => {
            data = {
                message: error.response.data.message,
                isLoading: false,
                status: "failed",
                error: error
            };
        });
    return data;
};
export const getExcutePlanDashboard = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/follow-impl-plan/action-plan/getExcutePlanDashboard?month=${month}`,
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
            // console.log(error)
            data = {
                message: error.response.data.message,
                isLoading: false,
                status: "failed",
                error: error
            };
        });
    return data;
};

export const getGrowthEnterprise = async (month) => {
    // console.log(`${baseUrl}mobile/follow-impl-plan/action-plan/getGrowthEnterprise?month=${month}`,)
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/follow-impl-plan/action-plan/getGrowthEnterprise?month=${month}`,
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
            // console.log(error)
            data = {
                message: error.response.data.message,
                isLoading: false,
                status: "failed",
                error: error
            };
        });
    return data;
};

export const getDeliveryEnterprise = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/follow-impl-plan/enterprise/getDeliveryEnterprise?month=${month}`,
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

export const getDeliverySubAmount = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/follow-impl-plan/enterprise/getDeliverySubAmount?month=${month}`,
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

export const getKamPTRevenue = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/follow-impl-plan/enterprise/getKamPTRevenue?month=${month}`,
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

export const getProductivitySub = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/follow-impl-plan/avg-productivity/getProductivitySub?month=${month}`,
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

export const getSalaryByMonthDashboard = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/monthly-salary/getSalaryByMonthDashboard?month=${month}`,
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
export const getProductSalary = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/monthly-salary/dashboard/getProductSalary?month=${month}`,
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

export const getAvgIncomeDashboard = async (fmonth, tmonth) => {
    // console.log(fmonth + tmonth)
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/avg-revenue/getAvgIncomeDashboard?fromMonth=${fmonth}&toMonth=${tmonth}`,
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

export const getTotalProductSalary = async (fmonth, tmonth) => {
    // console.log(fmonth + tmonth)
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/avg-revenue/dashboard/getTotalProductSalary?fromMonth=${fmonth}&toMonth=${tmonth}`,
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
export const getSubscriberQuality = async () => {
    // console.log(fmonth + tmonth)
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/quality-subs/getSubscriberQuality`,
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

export const getWarningDashboard = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/warning/getWarningDashboard?month=${month}`,
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

export const getEvolveSubsciber = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/warning/dashboard/getEvolveSubsciber?month=${month}`,
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

export const getEvolveRevenue = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/warning/dashboard/getEvolveRevenue?month=${month}`,
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

export const getKPIMonthReport = async (month) => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}mobile/report-kpi-month/getKPIMonthReport?month=${month}`,
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
            data = {
                message: error.response.data.message,
                isLoading: false,
                status: "failed",
                error: error
            };

        });
    return data;
};

export const getUserInfo = async () => {
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}user/getUserInfo`,
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
            data = {
                message: error.response.data.message,
                isLoading: false,
                status: "failed",
                error: error
            };

        });
    return data;
};

export const updateImage = async (formData) => {
    // console.log(formData)
    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}user/updateImage`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: await getToken(),
        },
        data: formData
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
            data = {
                message: error.response?.data.message,
                isLoading: false,
                status: "failed",
                error: error
            };

        });
    return data;
};

export const changePassword = async (oldPass, newPass) => {

    let data = baseData
    await axios({
        method: "POST",
        url: `${baseUrl}user/changePassword?newPass=${newPass}&oldPass=${oldPass}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: await getToken(),
        },
    })
        .then(async (res) => {
            console.log(res.data)
            if (res.status == 200) {
                    data = {
                        data: res.data,
                        isLoading: false,
                        status: "success",
                        error: null
                    };
                }

        })
        .catch(async (error) => {
            data = {
                message: error.response?.data.message,
                isLoading: false,
                status: "failed",
                error: error
            };

        });
    return data;
};