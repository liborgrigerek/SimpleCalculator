package cz.springexamples.calculators.simplecalculator.controller;

import java.text.DecimalFormat;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cz.springexamples.calculators.simplecalculator.dao.CalculationDAO;

/**
 *
 * @author libor
 */

@Controller
public class SimpleCalculatorController {
	
	@Autowired
	private CalculationDAO calculationDAO;

	// showing main view
	@RequestMapping("/")
	public String printMain(Map<String, Object> model) {
		// get the list of previous calculations
		model.put("calculations", calculationDAO.listAll());
		// and return main view
		return "main";
	}

	// evaluation of formula
	@RequestMapping("/eq.html")
	public String updateMain(ModelMap model, @RequestParam("formula") String formulaO,
			@RequestParam("result") String resultO) {

		String reg1 = "[+-]?[0-9]*[.]?[0-9]*[eE]?[+-]?[0-9]*";
		String formulaN = formulaO.replaceAll("\\((" + reg1 + ")\\)", "$1");

		String resultN;
		// treatment of ERROR 
		if (resultO.contains("ERROR")) {
			resultN = resultO;
		} else {
			DecimalFormat df = new DecimalFormat("#.###########");
			resultN = df.format(Double.parseDouble(resultO)).replace(",", ".");
		}
		// insert the new record to the DB
		calculationDAO.Insert(formulaN.replace("plus", "+"), resultN);
		// insert the attribute to the view
		model.addAttribute("calculations", calculationDAO.listAll());
		model.addAttribute("result", resultN);
		// and return view
		return "main";
	}
	
	// delete the DB
    @RequestMapping("/delete.html")
    public String deleteMain(ModelMap model) {
    	// delete all records from DB
        calculationDAO.Delete();
        // update view attributes
        model.addAttribute("calculations", calculationDAO.listAll());
        // redirect the view
        return "redirect:/";
    }
}
