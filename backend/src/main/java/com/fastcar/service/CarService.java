package com.fastcar.service;

import com.fastcar.model.Car;
import com.fastcar.model.Contrat;
import com.fastcar.repository.CarRepository;
import com.fastcar.repository.ContratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CarService {
    
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private ContratRepository contratRepository;
    
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
    
    public Optional<Car> getCarById(String matricule) {
        return carRepository.findById(matricule);
    }
    
    public Car createCar(Car car) {
        return carRepository.save(car);
    }
    
    public Car updateCar(String matricule, Car carDetails) {
        Optional<Car> optionalCar = carRepository.findById(matricule);
        if (optionalCar.isPresent()) {
            Car car = optionalCar.get();
            car.setMarque(carDetails.getMarque());
            car.setModele(carDetails.getModele());
            car.setEtat(carDetails.getEtat());
            car.setPrix(carDetails.getPrix());
            car.setKilometrage(carDetails.getKilometrage());
            return carRepository.save(car);
        }
        return null;
    }
    
    public boolean deleteCar(String matricule) {
        if (carRepository.existsById(matricule)) {
            carRepository.deleteById(matricule);
            return true;
        }
        return false;
    }
    
    public boolean existsById(String matricule) {
            return carRepository.existsById(matricule);
        }
        public boolean isCarAvailable(String matricule, LocalDate dateDebut, LocalDate dateFin) {

        if (dateDebut == null || dateFin == null || dateDebut.isAfter(dateFin)) {
            throw new IllegalArgumentException("Dates invalides");
        }

        List<Contrat> conflicts = contratRepository.findConflictingContrats(matricule, dateDebut, dateFin);

        return conflicts.isEmpty();
    }
}
