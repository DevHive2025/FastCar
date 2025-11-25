package com.fastcar.controller;

import com.fastcar.model.Car;
import com.fastcar.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {
    
    @Autowired
    private CarService carService;
    
    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.getAllCars();
        return ResponseEntity.ok(cars);
    }
    
    @GetMapping("/{matricule}")
    public ResponseEntity<Car> getCarById(@PathVariable String matricule) {
        Optional<Car> car = carService.getCarById(matricule);
        return car.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Car> createCar(@RequestBody Car car) {
        Car createdCar = carService.createCar(car);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCar);
    }
    
    @PutMapping("/{matricule}")
    public ResponseEntity<Car> updateCar(@PathVariable String matricule, @RequestBody Car carDetails) {
        Car updatedCar = carService.updateCar(matricule, carDetails);
        if (updatedCar != null) {
            return ResponseEntity.ok(updatedCar);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{matricule}")
    public ResponseEntity<Void> deleteCar(@PathVariable String matricule) {
        boolean deleted = carService.deleteCar(matricule);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
