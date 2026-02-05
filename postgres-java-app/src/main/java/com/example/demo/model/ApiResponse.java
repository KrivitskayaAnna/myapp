package com.example.demo.model;

import java.util.List;

public class ApiResponse {
    private String response;
    private List<AData> data;

    // Constructors
    public ApiResponse(String response) {
        this.response = response;
    }

    public ApiResponse(String response, List<AData> data) {
        this.response = response;
        this.data = data;
    }

    // Getters and Setters
    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public List<AData> getData() {
        return data;
    }

    public void setData(List<AData> data) {
        this.data = data;
    }
}