# WEB Data Visualization Application
This project is a data visualization web application built using Django, MongoDB, HTML, CSS, JavaScript, and the Chart.js library.

## Overview

This Django application is designed to visualize JSON data using charts and other interactive UI elements. It provides a user-friendly interface for viewing and analyzing data in a graphical format.

## Features

- **Interactive Charts**: Display JSON data in various types of charts, such as line charts, bar charts, pie charts, etc.
- **Customizable Dashboard**: Allow users to customize their dashboard by selecting which data to display and how it's visualized.
- **User Authentication**: Secure user authentication system to ensure data privacy and access control.
- **Responsive Design**: Responsive UI design ensures optimal viewing experience across different devices and screen sizes.
- **Data Filtering and Sorting**: Enable users to filter and sort data dynamically to focus on specific subsets or patterns.
- **Export and Share**: Option to export charts and data in various formats (e.g., CSV, PDF) and share them with others.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Davysongs/Web-Data-Visualization.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repository
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

6. Access the application at `http://localhost:8000` in your web browser.

## Usage

1. Login to the application using your credentials.
2. Navigate to the dashboard to view the interactive charts and data.
3. Customize the dashboard by selecting data sources, chart types, and other options.
4. Interact with the charts by hovering over data points, zooming in/out, and applying filters.
5. Export charts and data as needed for further analysis or sharing.

## Contributing

Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Django](https://www.djangoproject.com/)
- [Chart.js](https://www.chartjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
