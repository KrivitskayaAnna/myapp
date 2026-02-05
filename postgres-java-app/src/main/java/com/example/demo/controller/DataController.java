package com.example.demo.controller;

import com.example.demo.model.AData;
import com.example.demo.model.ApiResponse;
import com.example.demo.repository.ADataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DataController {

    @Autowired
    private ADataRepository aDataRepository;

    @GetMapping("/getall")
    public ApiResponse getAll() {
        List<AData> data = aDataRepository.findAll();
        return new ApiResponse("200", data);
    }

    @PostMapping("/addrow")
    public ApiResponse addRow(@RequestParam String data) {
        AData newData = new AData();
        newData.setData(data);
        aDataRepository.save(newData);
        return new ApiResponse("200");
    }

    @DeleteMapping("/deleterow")
    public ApiResponse deleteRow(@RequestParam Integer id) {
        aDataRepository.deleteById(id);
        return new ApiResponse("200");
    }
}