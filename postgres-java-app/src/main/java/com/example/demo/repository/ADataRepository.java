package com.example.demo.repository;

import com.example.demo.model.AData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ADataRepository extends JpaRepository<AData, Integer> {
}