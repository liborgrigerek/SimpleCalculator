package cz.springexamples.calculators.simplecalculator.dao;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import cz.springexamples.calculators.simplecalculator.model.Calculation;
import cz.springexamples.calculators.simplecalculator.model.CalculationMapper;

@Repository
public class CalculationDAOImpl implements CalculationDAO {

	//private DataSource dataSource; // not required by SpringBoot
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	// not required by SpringBoot
	//public void setDataSource(DataSource dataSource) {
	//	this.dataSource = dataSource;
	//	this.jdbcTemplate = new JdbcTemplate(dataSource);
	//}

	public List<Calculation> listAll() {
		String SQL = "select * from calculations";

		List<Calculation> calculations = jdbcTemplate.query(SQL, new CalculationMapper());

		return calculations;
	}

	public void Insert(String formula, String result) {
		String SQL = "INSERT INTO calculations (formula, result) " + "VALUES ('" + formula + "' ,'"
				+ result + "' )";

		jdbcTemplate.update(SQL);
	}

	public void Delete() {
		String SQL = "delete from calculations";

		jdbcTemplate.update(SQL);
	}
}
