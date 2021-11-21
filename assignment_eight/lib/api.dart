import 'package:dio/dio.dart';

import './models/courses.dart';

const String localhost = "http://localhost:1200/";

class CourseStudentApi {
  final _dio = Dio(BaseOptions(baseUrl: localhost));

  Future<List> getCourses() async {
    final response = await _dio.get('/getCourses');

    return response.data['courses'];
    //return (response.data as List).map((x) => Course.fromJson(x)).toList();
  }

  // Future editCoin(String id, double price) async {
  //   final response =
  //       await _dio.post('/editCoin', data: {'id': id, 'price': price});
  // }

  // Future deleteCoin(String id) async {
  //   final response = await _dio.post('/deleteCoin', data: {'id': id});
  // }
}
