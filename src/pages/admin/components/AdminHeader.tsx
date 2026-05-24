import React from 'react';
import { Badge, Avatar } from 'antd';

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  adminName: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ adminName }) => {
  return (
    <header className="admin-header">
      {/* Search Bar / Menu button for mobile */}
      <div className="d-flex align-items-center gap-3 flex-grow-1">
      </div>

      {/* Profile & Notifications */}
      <div className="d-flex align-items-center gap-3">
        {/* Notifications badge */}
        <Badge dot color="red">
          <button className="p-2 text-secondary btn btn-light rounded-circle border-0 d-flex align-items-center justify-content-center" style={{cursor: 'pointer'}}>
            <span className="material-symbols-outlined fs-5">notifications</span>
          </button>
        </Badge>


        {/* Profile Details */}
        <div className="d-flex align-items-center gap-3 ms-2 ps-3 border-start border-secondary-subtle">
          <div className="text-end d-none d-sm-block">
            <p className="small fw-semibold text-light text-capitalize mb-1 lh-1">
              {adminName}
            </p>
            <p className="text-light text-uppercase m-0 lh-1" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>
              SUPER ADMIN
            </p>
          </div>
          
          <Avatar
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3qyPsIisiTtbAmlPdrMgxWTcrtEcRiowxfC0KwZK7nsMjRiNcoLLDvbJHg6PjE_2qSKGnmmNzGTKloX-P6YHvN05XqrJ1m3RJM0yQT5njXtIiFBluJA7vFvPHvJ51xU_MQ-dDohyC90Ce-xVmTdzV47zB8SuCZEJ3c6CtkkbQZV2_Plv5WdtKDnPpHtjx6IpFZGMoTMZ_nR1du6qtAMKMttYzsoc_1FGws8_9v-4P0DNVykz7r0pV42Djd3PnHJG_rkzXbMBWrP8"
            size="large"
            className="border border-secondary-subtle"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
