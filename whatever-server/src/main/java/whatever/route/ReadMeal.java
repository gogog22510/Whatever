package whatever.route;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

public class ReadMeal {
    public static Meal[] parse() throws Exception {
        String fileName = "fulldata.csv";
        String[] header = {"Restaurant","Item","Price","Photo"};

        Reader reader = Files.newBufferedReader(Paths.get(ClassLoader.getSystemResource(fileName).toURI()));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader());
        List<CSVRecord> records = csvParser.getRecords();
        List<Meal> meals = new ArrayList<ReadMeal.Meal>();
        for (int i = 0; i < records.size(); i++) {
            CSVRecord record = records.get(i);
            String restaurant = record.get("Restaurant");
            String item = record.get("Item");
            double price = Double.parseDouble(record.get("Price"));
            String photourl = record.get("Photo");
            Meal meal = new Meal();
            meal.setResraurant(restaurant);
            meal.setItem(item);
            meal.setPrice(price);
            meal.setPhoroURL(photourl);
            meals.add(meal);
        }
        return meals.toArray(new Meal[0]);
    }

    @Data
    public static class Meal {
        private String restaurant;
        private String item;
        private double price;
        private String photourl;

        public void setResraurant(String s) {
            this.restaurant = s;
        }

        public void setItem(String s) {
            this.item = s;
        }

        public void setPhoroURL(String url) {
            this.photourl = url;
        }

        public void setPrice(double price) {
            this.price = price;
        }

    }

    public static void main(String[] args) throws IOException {
        try {
            ReadMeal.parse();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
