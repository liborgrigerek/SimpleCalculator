package cz.springexamples.calculators.simplecalculator.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.springframework.jdbc.core.RowMapper;

public class CalculationMapper implements RowMapper<Calculation>{

	public Calculation mapRow(ResultSet rs, int i) throws SQLException {
        return new Calculation(rs.getTimestamp("time"), rs.getString("formula"), rs.getString("result"));
    }
}
