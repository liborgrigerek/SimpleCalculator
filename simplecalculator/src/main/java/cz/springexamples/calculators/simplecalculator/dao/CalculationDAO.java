package cz.springexamples.calculators.simplecalculator.dao;

import java.util.List;

import cz.springexamples.calculators.simplecalculator.model.Calculation;

public interface CalculationDAO {
    public List<Calculation> listAll();
    
    public void Insert(String formula, String result);
    
    public void Delete();

}
