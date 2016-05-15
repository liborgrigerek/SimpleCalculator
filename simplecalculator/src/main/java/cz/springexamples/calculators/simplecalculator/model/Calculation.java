package cz.springexamples.calculators.simplecalculator.model;

import java.sql.Timestamp;

public class Calculation {
    
    private String formula;
    
    private String result;
    
    private Timestamp time;
    
    public Calculation(Timestamp time, String formula, String result) {
    	this.time = time;
    	this.formula = formula;
    	this.result = result;
    }

    public String getFormula() {
        return formula;
    }

    public void setFormula(String formula) {
        this.formula = formula;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getTime() {
        String date = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(time);
        
        return date;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }
    
    
}
