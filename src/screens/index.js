import React, { Component } from "react";

import Recovery from "./Auth/Recovery";
import SignIn from "./Auth/Signin";

import EmpDashboard from "./EmpHome/Dashboard";

import PlanFollowDashboard from "./EmpHome/PlanFollow/Dashboard";

import ExecutePlanDashboard from "./EmpHome/PlanFollow/ExecutePlan/Dashboard";
import TotalPostpaid from "./EmpHome/PlanFollow/ExecutePlan/TotalPostpaid";
import QualitySub from "./EmpHome/PlanFollow/ExecutePlan/QualitySub";
import IncurredRevenue from "./EmpHome/PlanFollow/ExecutePlan/IncurredRevenue";
import GrowthEnterprise from "./EmpHome/PlanFollow/ExecutePlan/GrowthEnterprise";
import TelecommunicationRevenue from "./EmpHome/PlanFollow/ExecutePlan/TelecommunicationRevenue";
import RetailRevenue from "./EmpHome/PlanFollow/ExecutePlan/RetailRevenue";
import Change4Gsim from "./EmpHome/PlanFollow/ExecutePlan/Change4Gsim";

import DeliveringEnterpriseDashboard from "./EmpHome/PlanFollow/DeliveringEnterprise/Dashboard"
import DeliveEnterpriseAmount from "./EmpHome/PlanFollow/DeliveringEnterprise/DeliveEnterpriseAmount";
import DeliveSubsciberAmount from "./EmpHome/PlanFollow/DeliveringEnterprise/DeliveSubsciberAmount";
import KAMPT from "./EmpHome/PlanFollow/DeliveringEnterprise/KAMPT";

import ProductivitySub from "./EmpHome/PlanFollow/ProductivitySub";

import SalaryByMonthDashboard from "./EmpHome/SalaryByMonth/Dashboard";
import Fixedwage from "./EmpHome/SalaryByMonth/Fixedwage";
import Product from "./EmpHome/SalaryByMonth/Product";
import PlanOut from "./EmpHome/SalaryByMonth/PlanOut";
import Sanctions from "./EmpHome/SalaryByMonth/Sanctions";
import Others from "./EmpHome/SalaryByMonth/Others";

import AVGIncomeDashboard from "./EmpHome/AVGIncome/Dashboard";
import TotalFixedwage from "./EmpHome/AVGIncome/TotalFixedwage";
import TotalProductwage from "./EmpHome/AVGIncome/TotalProductwage";
import PlanOutOutcome from "./EmpHome/AVGIncome/PlanOutOutcome";
import OtherOutcome from "./EmpHome/AVGIncome/OtherOutcome";

import SubscriberQuality from "./EmpHome/SubscriberQuality";

import WarningDashboard from "./EmpHome/Warning/Dashboard";
import SubFluct from "./EmpHome/Warning/SubFluct";
import IncomeFluct from "./EmpHome/Warning/IncomeFluct";
import EnterpriseFluct from "./EmpHome/Warning/EnterpriseFluct";
import KPIMonthReport from "./EmpHome/KPIMonthReport";

import ProfileDashboard from "./Profile/Dashboard"
import UpdatePassword from "./Profile/UpdatePassword"
import UpdateProfile from "./Profile/UpdateProfile"
import SignOut from "./SignOut"

import AdminDashboard from "./ManagerHome/Dashboard";

import KPICurrentMonthDashboard from "./ManagerHome/KPICurrentMonth/Dashboard";
import TopAM from "./ManagerHome/KPICurrentMonth/TopAM";
import GroupKPI from "./ManagerHome/KPICurrentMonth/GroupKPI";

import DeliveryListDashboard from "./ManagerHome/KPICurrentMonth/DeliveryList/Dashboard";
import DeliveEnterprise from "./ManagerHome/KPICurrentMonth/DeliveryList/DeliveEnterprise";
import DeliveEnterpriseDetail from "./ManagerHome/KPICurrentMonth/DeliveryList/DeliveEnterprise/DEDetail";

import SubsByEnterprise from "./ManagerHome/KPICurrentMonth/DeliveryList/SubsByEnterprise";
import SubsByEnterpriseDetail from "./ManagerHome/KPICurrentMonth/DeliveryList/SubsByEnterprise/SEDetail";

import RevenueByEnterprise from "./ManagerHome/KPICurrentMonth/DeliveryList/RevenueByEnterprise";
import ProductivitySubAdmin from "./ManagerHome/KPICurrentMonth/ProductivitySubAdmin";
import RevenueByEnterpriseDetail from "./ManagerHome/KPICurrentMonth/DeliveryList/RevenueByEnterprise/REDetail";

import BranchProductivitySub from "./ManagerHome/KPICurrentMonth/ProductivitySubAdmin/branch"
import ShopProductivitySub from "./ManagerHome/KPICurrentMonth/ProductivitySubAdmin/shop"

import SubscriberQualityAdminDashboard from "./ManagerHome/SubscriberQualityAdmin/Dashboard";
import SumReportStaff from "./ManagerHome/SubscriberQualityAdmin/SumReportStaff";
import SumReportUnit from "./ManagerHome/SubscriberQualityAdmin/SumReportUnit";
import SumReportUnitShop from "./ManagerHome/SubscriberQualityAdmin/SumReportUnit/Shop";
import SumReportUnitByUnit from "./ManagerHome/SubscriberQualityAdmin/SumReportUnit/Shop/Unit";
import SumReportUnitByEmp from "./ManagerHome/SubscriberQualityAdmin/SumReportUnit/Shop/Unit";

//SalaryByMonthAdmin
import SalaryByMonthAdmin from "./ManagerHome/SalaryByMonthAdmin/Branch";
import AdminMonthSalaryShop from "./ManagerHome/SalaryByMonthAdmin/Shop";
import AdminMonthSalaryEmp from "./ManagerHome/SalaryByMonthAdmin/Emp";

//AVGIncomeAdmin
import AVGIncomeAdmin from "./ManagerHome/AVGIncomeAdmin/Branch";
import AdminAVGIncomeShop from "./ManagerHome/AVGIncomeAdmin/Shop";
import AdminAVGIncomeEmp from "./ManagerHome/AVGIncomeAdmin/Emp";



export const AdminDashboardScreen = () => { return <AdminDashboard /> }

export const KPICurrentMonthDashboardScreen = () => { return <KPICurrentMonthDashboard /> }
export const TopAMScreen = () => { return <TopAM /> }
export const GroupKPIScreen = () => { return <GroupKPI /> }
export const DeliveryListDashboardScreen = () => { return <DeliveryListDashboard /> }
export const DeliveEnterpriseScreen = () => { return <DeliveEnterprise /> }
export const DeliveEnterpriseDetailScreen = () => { return <DeliveEnterpriseDetail /> }

export const SubsByEnterpriseScreen = () => { return <SubsByEnterprise /> }
export const SubsByEnterpriseDetailScreen = () => { return <SubsByEnterpriseDetail /> }

export const RevenueByEnterpriseScreen = () => { return <RevenueByEnterprise /> }
export const RevenueByEnterpriseDetailScreen = () => { return <RevenueByEnterpriseDetail /> }

export const ProductivitySubAdminScreen = () => { return <ProductivitySubAdmin /> }
export const BranchProductivitySubScreen = () => { return <BranchProductivitySub /> }
export const ShopProductivitySubScreen = () => { return <ShopProductivitySub /> }



export const SubscriberQualityAdminDashboardScreen = () => { return <SubscriberQualityAdminDashboard /> }
export const SumReportStaffScreen = () => { return <SumReportStaff /> }
export const SumReportUnitScreen = () => { return <SumReportUnit /> }
export const SumReportUnitShopScreen = () => { return <SumReportUnitShop /> }
export const SumReportUnitByUnitScreen = () => { return <SumReportUnitByUnit /> }
export const SumReportUnitByEmpScreen = () => { return <SumReportUnitByEmp /> }

// export const AVGIncomeAdminScreen = () => { return <AVGIncomeAdmin /> }

export const RecoveryScreen = () => { return <Recovery /> }
export const SignInScreen = () => { return <SignIn /> }



export const EmpDashboardScreen = (route) => { return <EmpDashboard route={route} /> }
export const PlanFollowDashboardScreen = (route) => { return <PlanFollowDashboard route={route} /> }
export const ExecutePlanDashboardScreen = (route) => { return <ExecutePlanDashboard route={route} /> }

export const TotalPostpaidScreen = () => { return <TotalPostpaid /> }
export const QualitySubScreen = () => { return <QualitySub /> }
export const IncurredRevenueScreen = () => { return <IncurredRevenue /> }
export const GrowthEnterpriseScreen = () => { return <GrowthEnterprise /> }
export const TelecommunicationRevenueScreen = () => { return <TelecommunicationRevenue /> }
export const RetailRevenueScreen = () => { return <RetailRevenue /> }
export const Change4GsimScreen = () => { return <Change4Gsim /> }
export const DeliveringEnterpriseDashboardScreen = (route) => { return <DeliveringEnterpriseDashboard route={route} /> }
export const DeliveEnterpriseAmountScreen = () => { return <DeliveEnterpriseAmount /> }
export const DeliveSubsciberAmountScreen = () => { return <DeliveSubsciberAmount /> }
export const KAMPTScreen = () => { return <KAMPT /> }
export const ProductivitySubScreen = () => { return <ProductivitySub /> }
export const SalaryByMonthDashboardScreen = (route) => { return <SalaryByMonthDashboard route={route} /> }
export const FixedwageScreen = () => { return <Fixedwage /> }
export const ProductScreen = () => { return <Product /> }
export const PlanOutScreen = () => { return <PlanOut /> }
export const SanctionsScreen = () => { return <Sanctions /> }
export const OthersScreen = () => { return <Others /> }

export const AVGIncomeDashboardScreen = (route) => { return <AVGIncomeDashboard route={route} /> }

export const TotalFixedwageScreen = () => { return <TotalFixedwage /> }
export const TotalProductwageScreen = () => { return <TotalProductwage /> }
export const PlanOutOutcomeScreen = () => { return <PlanOutOutcome /> }
export const OtherOutcomeScreen = () => { return <OtherOutcome /> }
export const SubscriberQualityScreen = () => { return <SubscriberQuality /> }
export const WarningDashboardScreen = (route) => { return <WarningDashboard route={route} /> }
export const SubFluctScreen = () => { return <SubFluct /> }
export const IncomeFluctScreen = () => { return <IncomeFluct /> }
export const EnterpriseFluctScreen = () => { return <EnterpriseFluct /> }
export const KPIMonthReportScreen = () => { return <KPIMonthReport /> }

export const ProfileDashboardScreen = (route) => { return <ProfileDashboard route={route} /> }
export const UpdatePasswordScreen = () => { return <UpdatePassword /> }
export const UpdateProfileScreen = () => { return <UpdateProfile /> }


//SalaryByMonthAdmin
export const AVGIncomeAdminScreen = () => { return <AVGIncomeAdmin /> }
export const AdminAVGIncomeShopScreen = () => { return <AdminAVGIncomeShop /> }
export const AdminAVGIncomeEmpScreen = () => { return <AdminAVGIncomeEmp /> }


//AVGIncomeAdmin
export const SalaryByMonthAdminScreen = () => { return <SalaryByMonthAdmin /> }
export const AdminMonthSalaryShopScreen = () => { return <AdminMonthSalaryShop /> }
export const AdminMonthSalaryEmpScreen = () => { return <AdminMonthSalaryEmp /> }




export const SignOutScreen = () => { return <SignOut /> }