# KAMAM_Salary

# Cấu trúc Project
#   src: Chứa toàn bộ source Prj
#       api: Gọi api theo phân quyền
#           emp.js: tất cả các api thuộc role nhân viên
#           manager.js: tất cả các api thuộc role quản lý
#       comps: các components dùng chung, viết theo nhóm tránh tạo quá nhiều file làm rối cấu trúc (*)
#       models: các models để lưu trữ các object, array dữ liệu
#       screens: các màn hình phân quyền theo luồng của bản design (phân cấp cha/con)
#           Auth: các màn hình thuộc nhóm xác thực
#               Recovery: Khôi phục mật khẩu
#               Signin: Đăng nhập
#           EmpHome: các màn hình của cấp Nhân viên
#               Dashboard: màn hình Home
#               PlanFollow: theo dõi thực hiện kế hoạch
#                   Dashboard: màn hình chính Theo dõi thực hiện kế hoạch
#                   ExecutePlan: Thực hiện kế hoạch
#                       Dashboard: màn hình chính Thực hiện kế hoạch
#                       TotalPostpaid: Tổng thuê bao trả sau
#                       QualitySub: Thuê bao chất lượng
#                       IncurredRevenue: Doanh thu phát sinh
#                       GrowthEnterprise: Doanh nghiệp phát triển mới
#                       TelecommunicationRevenue: Doanh thu viễn thông
#                       RetailRevenue: Doanh thu bán lẻ
#                       Change4Gsim: thay sim 4G
#                   DeliveringEnterprise: Danh sách DN đang giao
#                       Dashboard: màn hình chính danh sách DN đang giao
#                       DeliveEnterpriseAmount: số lượng doanh nghiệp đang giao
#                       DeliveSubsciberAmount: Số lượng TB trả sau thuộc tập DN đang giao
#                       KAMPT: doanh thu TB do KAM PT thuộc tập DN giao
#                   ProductivitySub: Năng suất bình quân
#               SalaryByMonth: Lương theo tháng
#                   Dashboard: màn hình chính Lương theo tháng
#                   Fixedwage: Lương cố định
#                   Product: Lương sản phẩm
#                   PlanOut: Vượt kế hoạch
#                   Sanctions: Chế tài vi phạm
#                   Others: Chi khác
#               AVGIncome: Bình quân thu nhập
#                   Dashboard: màn hình chính Bình quân thu nhập
#                   TotalFixedwage: Tổng lương cố định
#                   TotalProductwage: Tổng lương sản phẩm
#                   PlanOutOutcome: Tổng chi thưởng vượt kế hoạch
#                   OtherOutcome: Tổng chi khác
#               SubscriberQuality: Chất lượng thuê bao
#               Warning: Cảnh báo
#                   Dashboard: màn hình chính cảnh báo
#                   SubFluct: Biến động thuê bao
#                   IncomeFluct: Biến động doanh thu
#                   EnterpriseFluct: Biến động DN trong tập DS giao
#               KPIMonthReport: Báo cáo KPI tháng
#           ManagerHome: các màn hình của cấp quản lý
#               Dashboard: màn hình Home  
#               KPICurrentMonth: KPI tháng hiện tại
#                   Dashboard: màn hình Home KPICurrentMonth
#                   TopAM: TopAM
#                   GroupKPI: Nhóm KPI
#                   DeliveryList: Tập danh sách giao
#                       Dashboard: màn hình chính DeliveryList
#                       DeliveEnterprise: Doanh nghiệp giao
#                       SubsByEnterprise: Thuê bao theo doanh nghiệp
#                       RevenueByEnterprise: Doanh thu theo doanh nghiệp
#                   ProductivitySubAdmin: Năng suất bình quân
#               SalaryByMonthAdmin: Lương theo tháng
#               AVGIncomeAdmin: Bình quân thu nhập
#               SubscriberQualityAdmin: Chất lượng thuê bao
#                   Dashboard: màn hình Home SubscriberQuality
#                   SumReportUnit: Báo cáo tổng hợp theo đơn vị
#                   SumReportStaff: Báo cáo tổng hợp theo nhân viên
#           index.js: khai báo các màn hình thành các functions để navigate và phân quyền trong app
#       utils: general files
#           Text.js: tất cả các từ hoặc câu cố định sử dụng trong các màn hình
#           Storage.js: lưu trữ/truy xuất bộ nhớ local
#           Logistics.js: các hàm xử lý logic trong app
#           Images.js: các biến hình ảnh dùng trong prj
#           Fonts.js: hàm responsive font & size các đối tượng trong View
#           Dimension.js: screen width / screen height / statusbar height
#           Colors.js: tất cả các mã màu cơ bản sử dụng trong prj


#    ROLE_EMPLOYEE - nhân viên,
#    ROLE_LEADER - khối KAM/AM,
#    ROLE_BRANCH - chi nhánh,
#    ROLE_COMPANY - công ty