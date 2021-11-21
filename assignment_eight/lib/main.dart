import 'dart:convert';

import 'package:assignment_eight/api.dart';
import 'package:assignment_eight/models/courses.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Courses and Students App",
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  final CourseStudentApi api = CourseStudentApi();

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  //Set Variables here
  List courses = [];
  //var courses = <Course>[];

  //Create functions here
  void initState() {
    super.initState();

    widget.api.getCourses().then((data) {
      setState(() {
        courses = data;
        //_dbLoaded = true;
      });
    });
  }

  // _getCourses() {
  //   widget.api.getCourses().then((response) {
  //     setState(() {
  //       Iterable list = json.decode(response.toString());
  //       courses = list.map((model) => Course.fromJson(model)).toList();
  //     });
  //   });
  // }

  // initState() {
  //   super.initState();
  //   _getCourses();
  // }

  // dispose() {
  //   super.dispose();
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Courses and Students App"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            TextButton(
                onPressed: () => {
                      print(courses),
                    },
                child: Text("Press Me"))
          ],
        ),
      ),
    );
  }
}
