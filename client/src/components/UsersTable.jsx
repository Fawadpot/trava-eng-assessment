import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { TextFilterModule } from "ag-grid-community";
import { NumberFilterModule } from "ag-grid-community";
import { DateFilterModule } from "ag-grid-community";
import { SetFilterModule } from "ag-grid-enterprise";
import { MultiFilterModule } from "ag-grid-enterprise";
import { GroupFilterModule } from "ag-grid-enterprise";
import { CustomFilterModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  PaginationModule,
  ValidationModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  ValidationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  SetFilterModule,
  MultiFilterModule,
  GroupFilterModule,
  CustomFilterModule,
]);

import { fetchUsers } from "../api";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramsObject = Object.fromEntries(queryParams.entries());
    setFilters(paramsObject);
  }, []);

  const createShortUrl = async (payload) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/url/shorten",
        payload
      );

      const newUrl = `${window.location.pathname}?hash=${res.data}`;
      window.history.pushState(null, "", newUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(filters);
        if (!data) {
          console.error("Invalid users data:", data);
          setUsers([]);
        } else {
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    loadUsers();
  }, [filters]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  const filterParams = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    filterParams: {
      buttons: [],
      suppressAndOrCondition: true,
      suppressFilterButton: true,
      alwaysShowBothConditions: false,
    },
  };
  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "First Name",
      field: "firstName",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Last Name",
      field: "lastName",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Username",
      field: "username",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Age",
      field: "age",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Role",
      field: "role",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Gender",
      field: "gender",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Department",
      field: "department",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Location",
      field: "location",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Last Login",
      field: "lastLogin",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Phone Number",
      field: "phoneNumber",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Bio",
      field: "bio",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Timezone",
      field: "timezone",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Language",
      field: "language",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Theme Preference",
      field: "themePreference",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Profile Picture",
      field: "profilePicture",
      cellRenderer: (params) =>
        params.value
          ? `<img src="${params.value}" alt="Profile" style="width: 40px; height: 40px; border-radius: 50%;" />`
          : "",
    },
    {
      headerName: "Permissions",
      field: "permissions",
      cellRenderer: (params) => (params.value ? params.value.join(", ") : ""),
    },
    {
      headerName: "Created By",
      field: "createdBy",
      sortable: true,
      ...filterParams,
    },
    {
      headerName: "Updated By",
      field: "updatedBy",
      sortable: true,
      ...filterParams,
    },
  ];

  const onFilterChanged = (event) => {
    if (!gridApi) return;
    const filters = JSON.parse(JSON.stringify(event.api.getFilterModel()));

    const queryFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value.filter) acc[key] = value.filter;
      return acc;
    }, {});

    const queryString = new URLSearchParams(queryFilters).toString();
    const newUrl = `${window.location.pathname}?${queryString}`;
    let hash = "";
    let payload = { url: queryString, hash };
    createShortUrl(payload);
    // window.history.pushState(null, "", newUrl);
    setFilters(queryFilters);
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <AgGridReact
        onGridReady={onGridReady}
        rowData={users}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={50}
        onFilterChanged={onFilterChanged}
        theme="legacy"
      />
    </div>
  );
};

export default UsersTable;
